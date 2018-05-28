const Page = require('./helpers/page');

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto('localhost:3000');
});

afterEach(async () => {
	await page.close();
});

test('Adds two numbers', () => {
	const sum = 1 + 2;
	expect(sum).toEqual(3);
});

test('The header has the correct text', async () => {
	const text = await page.getContentsOf('a.brand-logo');
	expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
	await page.click('.right a');
	const url = await page.url();
	expect(url).toMatch(/accounts\.google\.com/);
});

test('when signed in shows logout button', async () => {
	//	const id = '5a98dc26f725be4974c4daf7';
	await page.login(); // simulates creating and logging in a user
	const text = await page.getContentsOf('a[href="/auth/logout"]'); // use of FP
	expect(text).toEqual('Logout');
});
