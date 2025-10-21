import { test, expect } from '@playwright/test';

test.describe('TODO Application - User Journey Test (#200010919)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:5173');
    
    // Clear local storage to start with a clean state
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    // Reload the page after clearing storage
    await page.reload();
  });

  test('User can view and interact with TODO application', async ({ page }) => {
    // Steps 1-4: Verify initial screen elements
    // Step 2: Verify "TODO 리스트" title is visible
    const title = page.getByRole('heading', { name: 'TODO 리스트', level: 1 });
    await expect(title).toBeVisible();

    // Step 3: Verify input box (textbox) is visible
    const inputBox = page.getByRole('textbox');
    await expect(inputBox).toBeVisible();

    // Step 4: Verify "추가" button is visible
    const addButton = page.getByRole('button', { name: '추가' });
    await expect(addButton).toBeVisible();

    // Verify empty state message
    await expect(page.getByText('할 일이 없습니다.')).toBeVisible();

    // Steps 5-8: Add first TODO item "Buy groceries"
    // Step 5: Enter first TODO item
    await inputBox.fill('Buy groceries');
    
    // Step 6: Click add button
    await addButton.click();

    // Step 7: Verify "Buy groceries" item is added to the list
    const firstItem = page.getByRole('listitem').filter({ hasText: 'Buy groceries' });
    await expect(firstItem).toBeVisible();

    // Step 8: Verify input box is cleared
    await expect(inputBox).toHaveValue('');

    // Verify empty state message is no longer visible
    await expect(page.getByText('할 일이 없습니다.')).not.toBeVisible();

    // Steps 9-12: Add second TODO item "Read a book"
    // Step 9: Enter second TODO item
    await inputBox.fill('Read a book');
    
    // Step 10: Click add button
    await addButton.click();

    // Step 11: Verify "Read a book" item is added at the top
    const listItems = page.getByRole('listitem');
    await expect(listItems).toHaveCount(2);
    
    // Verify order: "Read a book" should be first
    const items = await listItems.allTextContents();
    expect(items[0]).toBe('Read a book');
    
    // Step 12: Verify "Buy groceries" is in second position
    expect(items[1]).toBe('Buy groceries');

    // Steps 13-14: Verify persistence after page refresh
    // Step 13: Refresh the page
    await page.reload();

    // Step 14: Verify both TODO items are still present after refresh
    await expect(listItems).toHaveCount(2);
    
    // Verify the order is maintained
    const itemsAfterRefresh = await listItems.allTextContents();
    expect(itemsAfterRefresh[0]).toBe('Read a book');
    expect(itemsAfterRefresh[1]).toBe('Buy groceries');

    // Verify input box is still empty
    await expect(inputBox).toHaveValue('');
    
    // Verify title and button are still visible
    await expect(title).toBeVisible();
    await expect(addButton).toBeVisible();
  });

  test('TODO items are stored in localStorage', async ({ page }) => {
    // Add a TODO item
    const inputBox = page.getByRole('textbox');
    const addButton = page.getByRole('button', { name: '추가' });
    
    await inputBox.fill('Test localStorage');
    await addButton.click();

    // Verify item is in localStorage
    const localStorageData = await page.evaluate(() => {
      return localStorage.getItem('todos');
    });

    expect(localStorageData).toBeTruthy();
    const todos = JSON.parse(localStorageData as string);
    expect(todos).toHaveLength(1);
    expect(todos[0]).toContain('Test localStorage');
  });
});
