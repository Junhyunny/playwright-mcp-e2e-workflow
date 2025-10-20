import { test, expect } from '@playwright/test';

/**
 * Story #200010919: User can view the TODO application screen
 * 
 * This E2E test validates the complete user journey for the TODO application,
 * covering all acceptance criteria specified in the story.
 */

test.describe('TODO Application - User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:5173');
    
    // Clear local storage to start with a clean state
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('complete user journey: view UI, add items, and verify persistence', async ({ page }) => {
    // Step 1-4: Verify TODO application screen elements
    await test.step('Verify TODO application UI elements', async () => {
      // Verify "TODO 리스트" heading is displayed
      const heading = page.getByRole('heading', { name: 'TODO 리스트', level: 1 });
      await expect(heading).toBeVisible();

      // Verify input textbox is displayed
      const inputBox = page.getByRole('textbox');
      await expect(inputBox).toBeVisible();

      // Verify "추가" (Add) button is displayed
      const addButton = page.getByRole('button', { name: '추가' });
      await expect(addButton).toBeVisible();

      // Verify empty state message
      await expect(page.getByText('할 일이 없습니다.')).toBeVisible();
    });

    // Step 5-8: Add first TODO item
    await test.step('Add first TODO item "Buy groceries"', async () => {
      const inputBox = page.getByRole('textbox');
      const addButton = page.getByRole('button', { name: '추가' });

      // Type first TODO item
      await inputBox.fill('Buy groceries');
      
      // Click add button
      await addButton.click();

      // Verify item is added to the list
      const todoList = page.getByRole('list');
      await expect(todoList.getByRole('listitem')).toHaveCount(1);
      await expect(todoList.getByText('Buy groceries')).toBeVisible();

      // Verify input box is cleared
      await expect(inputBox).toHaveValue('');

      // Verify empty state message is gone
      await expect(page.getByText('할 일이 없습니다.')).not.toBeVisible();
    });

    // Step 9-11: Add second TODO item and verify ordering
    await test.step('Add second TODO item "Write report" at the top', async () => {
      const inputBox = page.getByRole('textbox');
      const addButton = page.getByRole('button', { name: '추가' });

      // Type second TODO item
      await inputBox.fill('Write report');
      
      // Click add button
      await addButton.click();

      // Verify two items exist
      const todoList = page.getByRole('list');
      const listItems = todoList.getByRole('listitem');
      await expect(listItems).toHaveCount(2);

      // Verify newest item is at the top (first position)
      await expect(listItems.nth(0)).toContainText('Write report');
      await expect(listItems.nth(1)).toContainText('Buy groceries');

      // Verify input box is cleared again
      await expect(inputBox).toHaveValue('');
    });

    // Step 12-13: Verify data persistence after page refresh
    await test.step('Verify data persistence after page refresh', async () => {
      // Refresh the page
      await page.reload();

      // Verify both items still exist in the same order
      const todoList = page.getByRole('list');
      const listItems = todoList.getByRole('listitem');
      
      await expect(listItems).toHaveCount(2);
      await expect(listItems.nth(0)).toContainText('Write report');
      await expect(listItems.nth(1)).toContainText('Buy groceries');

      // Verify UI elements are still present
      await expect(page.getByRole('heading', { name: 'TODO 리스트' })).toBeVisible();
      await expect(page.getByRole('textbox')).toBeVisible();
      await expect(page.getByRole('button', { name: '추가' })).toBeVisible();
    });
  });

  test('verify empty input is not added', async ({ page }) => {
    await test.step('Attempt to add empty TODO item', async () => {
      const addButton = page.getByRole('button', { name: '추가' });
      const inputBox = page.getByRole('textbox');

      // Click add button without entering text
      await addButton.click();

      // Verify no items are added
      const emptyMessage = page.getByText('할 일이 없습니다.');
      await expect(emptyMessage).toBeVisible();
      
      // Verify list is not created
      await expect(page.getByRole('list')).not.toBeVisible();
    });
  });
});
