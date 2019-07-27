Feature('Basic test');

Scenario('navigate to homepage', I => {
  I.amOnPage('http://react-app:3000');
  // pause();
  I.waitForElement('.smallText', 30);
  I.see('User 4');
  I.saveScreenshot('frontpageScreenshot.png');

  I.click({xpath: '//*[@id="root"]/div/div/div/div/table/tbody/tr[3]/td[3]'});
  I.saveScreenshot('frontpageScreenshot1.png');
  I.fillField('name','test');
  I.saveScreenshot('frontpageScreenshot2.png');
  I.click('Save changes', '.modal-footer');
  // locate('tr').withAttr({ key: '1' });
  I.saveScreenshot('frontpageScreenshot3.png');
  I.see('test');
});