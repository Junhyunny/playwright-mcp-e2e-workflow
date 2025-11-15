import { test, expect } from '@playwright/test';

test.describe('TODO Application - User Journey Test', () => {
  test.beforeEach(async ({ page }) => {
    // 테스트 전에 로컬 스토리지 초기화
    await page.goto('http://localhost:5173');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('사용자는 TODO 애플리케이션 화면을 보고 항목을 추가하며 새로고침 후에도 데이터가 유지됨', async ({ page }) => {
    // 1-2단계: TODO 애플리케이션 접속 및 초기 화면 확인
    await page.goto('http://localhost:5173');
    
    // "TODO 리스트" 제목 확인
    await expect(page.getByRole('heading', { name: 'TODO 리스트', level: 1 })).toBeVisible();
    
    // 입력박스 확인
    const inputBox = page.getByRole('textbox');
    await expect(inputBox).toBeVisible();
    
    // "추가" 버튼 확인
    const addButton = page.getByRole('button', { name: '추가' });
    await expect(addButton).toBeVisible();
    
    // 초기 상태에서 "할 일이 없습니다." 메시지 확인
    await expect(page.getByText('할 일이 없습니다.')).toBeVisible();

    // 3-5단계: 첫 번째 TODO 항목 "Buy groceries" 추가
    await inputBox.fill('Buy groceries');
    await addButton.click();
    
    // 항목이 리스트에 표시되는지 확인
    const list = page.getByRole('list');
    await expect(list.getByRole('listitem').filter({ hasText: 'Buy groceries' })).toBeVisible();
    
    // 입력박스가 비워졌는지 확인
    await expect(inputBox).toHaveValue('');

    // 6-8단계: 두 번째 TODO 항목 "Read a book" 추가
    await inputBox.fill('Read a book');
    await addButton.click();
    
    // 새 항목이 최상단에 추가되었는지 확인
    const listItems = await list.getByRole('listitem').allTextContents();
    expect(listItems).toEqual(['Read a book', 'Buy groceries']);
    
    // 입력박스가 다시 비워졌는지 확인
    await expect(inputBox).toHaveValue('');

    // 9-10단계: 페이지 새로고침 후 데이터 지속성 확인
    await page.reload();
    
    // 새로고침 후에도 항목들이 동일한 순서로 유지되는지 확인
    const listItemsAfterReload = await list.getByRole('listitem').allTextContents();
    expect(listItemsAfterReload).toEqual(['Read a book', 'Buy groceries']);
    
    // 기본 UI 요소들이 여전히 표시되는지 확인
    await expect(page.getByRole('heading', { name: 'TODO 리스트', level: 1 })).toBeVisible();
    await expect(inputBox).toBeVisible();
    await expect(addButton).toBeVisible();
  });
});
