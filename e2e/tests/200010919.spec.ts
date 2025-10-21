import { test, expect } from '@playwright/test';

test.describe('TODO Application User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:5173');
    
    // Clear local storage to start with a clean state
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('User can view and interact with TODO application through complete journey', async ({ page }) => {
    // Step 1-3: Verify initial screen elements
    await expect(page.getByRole('heading', { name: 'TODO 리스트', level: 1 })).toBeVisible();
    await expect(page.getByRole('textbox')).toBeVisible();
    await expect(page.getByRole('button', { name: '추가' })).toBeVisible();
    
    // Verify empty state message
    await expect(page.getByText('할 일이 없습니다.')).toBeVisible();

    // Step 4-5: Add first TODO item "Buy groceries"
    const inputBox = page.getByRole('textbox');
    const addButton = page.getByRole('button', { name: '추가' });
    
    await inputBox.fill('Buy groceries');
    await addButton.click();
    
    // Verify item was added and input was cleared
    await expect(page.getByRole('listitem').filter({ hasText: 'Buy groceries' })).toBeVisible();
    await expect(inputBox).toHaveValue('');

    // Step 6: Add second TODO item "Read a book"
    await inputBox.fill('Read a book');
    await addButton.click();
    
    // Verify item was added at the top
    const listItems = page.getByRole('listitem');
    await expect(listItems).toHaveCount(2);
    await expect(listItems.first()).toContainText('Read a book');

    // Step 7: Add third TODO item "Exercise"
    await inputBox.fill('Exercise');
    await addButton.click();
    
    // Step 8: Verify items are in correct order (newest first)
    await expect(listItems).toHaveCount(3);
    await expect(listItems.nth(0)).toContainText('Exercise');
    await expect(listItems.nth(1)).toContainText('Read a book');
    await expect(listItems.nth(2)).toContainText('Buy groceries');

    // Step 9: Verify empty value validation
    await inputBox.fill('   ');
    await addButton.click();
    
    // Items count should remain 3
    await expect(listItems).toHaveCount(3);

    // Step 10-11: Verify local storage persistence after page reload
    await page.reload();
    
    // Verify all items are still present in the same order
    await expect(listItems).toHaveCount(3);
    await expect(listItems.nth(0)).toContainText('Exercise');
    await expect(listItems.nth(1)).toContainText('Read a book');
    await expect(listItems.nth(2)).toContainText('Buy groceries');
  });
});
