import { test, expect, type Page, type Locator } from '@playwright/test';

/**
 * Centralised UI selectors.
 * Keeping selectors in one place makes tests easier to read
 * and reduces maintenance cost when markup changes.
 */
const ui = {
    cards: (page: Page) => page.getByTestId('member-card'),
    search: (page: Page) => page.getByTestId('search-input'),
    availability: (page: Page) => page.getByTestId('availability-filter'),
    timezone: (page: Page) => page.getByTestId('timezone-filter'),
    sort: (page: Page) => page.getByTestId('sort-filter'),
    empty: (page: Page) => page.getByTestId('empty-state'),
};

/**
 * Opens a listbox trigger and selects an option by its accessible name.
 * Using roles here encourages accessible markup and stable selectors.
 */
async function selectOption(page: Page, trigger: Locator, option: string | RegExp) {
    await trigger.click();
    await page.getByRole('option', { name: option }).click();
}

/**
 * Helper for counting currently rendered cards.
 * Extracted to improve readability and to reuse in polling assertions.
 */
async function count(cards: Locator) {
    return await cards.count();
}

/**
 * Extracts visible member names from cards.
 * Used for sorting assertions without relying on implementation details
 * (e.g. internal sort functions or data structures).
 */
async function namesFromCards(cards: Locator) {
    const n = await cards.count();
    const names: string[] = [];
    for (let i = 0; i < n; i++) {
        names.push((await cards.nth(i).getByTestId('member-name').innerText()).trim());
    }
    return names;
}

/**
 * Checks whether strings are sorted in ascending alphabetical order (A → Z).
 * localeCompare is used to match user expectations for string ordering.
 */
function isSortedAsc(values: string[]) {
    const sorted = [...values].sort((a, b) => a.localeCompare(b));
    return values.every((v, i) => v === sorted[i]);
}

test.describe('Team directory - search / filters / sorting', () => {
    /**
     * Verifies AND-composition of filters:
     * - search + availability + timezone must be combined (not overridden)
     * - clearing search must NOT reset other active filters
     */
    test('AND logic: search + availability + timezone; clearing search keeps other filters', async ({
        page,
    }) => {
        await page.goto('/');

        const cards = ui.cards(page);
        await expect(cards.first()).toBeVisible();

        const initial = await count(cards);

        // Search should narrow results (debounced UI updates are handled via poll)
        await ui.search(page).fill('react');
        await expect.poll(() => count(cards)).toBeLessThan(initial);

        // Apply availability filter
        await selectOption(page, ui.availability(page), 'Focus');
        const afterAvail = await count(cards);
        expect(afterAvail).toBeGreaterThan(0);

        // Apply timezone filter
        await selectOption(page, ui.timezone(page), /America/i);
        const afterAll = await count(cards);
        expect(afterAll).toBeGreaterThan(0);

        // Clearing search should keep other filters active
        await ui.search(page).fill('');
        const afterClear = await count(cards);
        expect(afterClear).toBeGreaterThan(0);

        // Every visible card should still be in "Focus" state
        for (let i = 0; i < afterClear; i++) {
            await expect(cards.nth(i).locator('.status.status--focus')).toBeVisible();
        }
    });

    /**
     * Sorting stability check:
     * - when sorting is set to Name (A → Z), the list should be sorted
     * - applying search should not break the sorting order
     */
    test('Sorting: Name A→Z stays after search/filter changes', async ({ page }) => {
        await page.goto('/');

        const cards = ui.cards(page);
        await expect(cards.first()).toBeVisible();

        // Select name sorting explicitly
        await selectOption(page, ui.sort(page), /Name/i);

        const before = await namesFromCards(cards);
        expect(before.length).toBeGreaterThan(1);
        expect(isSortedAsc(before)).toBeTruthy();

        // Apply a broad search that still leaves multiple results
        await ui.search(page).fill('a');
        const after = await namesFromCards(cards);
        expect(after.length).toBeGreaterThan(1);
        expect(isSortedAsc(after)).toBeTruthy();
    });

    /**
     * Empty state behaviour:
     * - a query with no matches results in an empty list and an empty-state UI
     * - clearing the query restores the original list
     */
    test('Empty state: shows 0 results and restores after clearing search', async ({ page }) => {
        await page.goto('/');

        const cards = ui.cards(page);
        await expect(cards.first()).toBeVisible();

        const initial = await count(cards);

        await ui.search(page).fill('zzzzzz');
        await expect(cards).toHaveCount(0);
        await expect(ui.empty(page)).toBeVisible();

        await ui.search(page).fill('');
        await expect(cards).toHaveCount(initial);
    });

    /**
     * Keyboard accessibility test for the Availability Listbox:
     * - the control can be reached via Tab
     * - it can be opened with Enter
     * - options can be navigated with arrow keys
     * - selection can be confirmed with Enter
     * - focus returns to the trigger after selection
     *
     * This test provides a strong accessibility signal in a portfolio:
     * it validates real keyboard interaction, not just ARIA attributes.
     */
    test('Availability filter is accessible via keyboard', async ({ page }) => {
        await page.goto('/');

        const cards = ui.cards(page);
        await expect(cards.first()).toBeVisible();

        const initialCount = await count(cards);

        // Tab order: Search input → Availability button
        await page.keyboard.press('Tab'); // focus search input
        await page.keyboard.press('Tab'); // focus availability trigger

        const availability = ui.availability(page);
        await expect(availability).toBeFocused();

        // Open the listbox using keyboard
        await page.keyboard.press('Enter');

        // Ensure options are rendered and visible
        const options = page.getByRole('option');
        await expect(options.first()).toBeVisible();

        // Navigate options via ArrowDown.
        // NOTE: the number of presses depends on the option order.
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        // Confirm selection
        await page.keyboard.press('Enter');

        // Verify that filtering is applied (results should be reduced)
        await expect.poll(() => count(cards)).toBeLessThan(initialCount);

        const filteredCount = await count(cards);
        expect(filteredCount).toBeGreaterThan(0);

        // Every visible card should have "focus" status styling
        for (let i = 0; i < filteredCount; i++) {
            await expect(cards.nth(i).locator('.status.status--focus')).toBeVisible();
        }

        // Focus should return to the trigger button after committing selection
        await expect(availability).toBeFocused();
    });
});
