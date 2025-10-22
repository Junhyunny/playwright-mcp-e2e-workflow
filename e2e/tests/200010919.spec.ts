import { test, expect } from '@playwright/test';

test.describe('TODO Application User Journey', () => {
  test('User can view and interact with TODO application', async ({ page }) => {
    // 1-2. 사용자가 TODO 애플리케이션에 접속하고 타이틀을 확인한다
    await page.goto('http://localhost:5173');
    await expect(page.getByRole('heading', { name: /TODO/ })).toBeVisible();

    // 3. 사용자는 입력 폼과 추가 버튼을 확인한다
    const inputBox = page.getByRole('textbox');
    const addButton = page.getByRole('button', { name: /추가|Add/ });
    await expect(inputBox).toBeVisible();
    await expect(addButton).toBeVisible();

    // 4-5. 사용자는 첫 번째 TODO 항목을 입력하고 추가한다
    await inputBox.fill('Buy groceries');
    await addButton.click();

    // 6. 사용자는 새로 추가된 항목이 리스트 최상단에 표시되는 것을 확인한다
    const todoList = page.getByRole('list');
    const firstItem = todoList.getByRole('listitem').first();
    await expect(firstItem).toContainText('Buy groceries');

    // 7. 사용자는 입력 필드가 자동으로 비워진 것을 확인한다
    await expect(inputBox).toHaveValue('');

    // 8-9. 사용자는 두 번째 TODO 항목을 입력하고 추가한다
    await inputBox.fill('Write report');
    await addButton.click();

    // 10. 사용자는 두 번째 항목이 최상단에 추가되고, 첫 번째 항목이 그 아래에 있는 것을 확인한다
    const allItems = todoList.getByRole('listitem');
    await expect(allItems.first()).toContainText('Write report');
    await expect(allItems.nth(1)).toContainText('Buy groceries');

    // 11. 사용자는 페이지를 새로고침한다
    await page.reload();

    // 12. 사용자는 새로고침 후에도 TODO 항목들이 순서대로 유지되어 있는 것을 확인한다
    const itemsAfterReload = page.getByRole('list').getByRole('listitem');
    await expect(itemsAfterReload.first()).toContainText('Write report');
    await expect(itemsAfterReload.nth(1)).toContainText('Buy groceries');
    
    // 로컬 스토리지 데이터 지속성 확인
    await expect(itemsAfterReload).toHaveCount(await allItems.count());
  });
});
