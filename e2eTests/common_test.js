Feature('Acceptance Test');

Before((I) => {
  I.amOnPage('http://react-app:3000');
});

Scenario('users are displayed', I => {
  I.waitForElement('.smallText', 30);
  I.see('User 4');
  I.saveScreenshot('usersloaded.png');
});

Scenario('edit user', I => {
  I.click({xpath: '//*[@id="root"]/div/div/div/div/table/tbody/tr[3]/td[3]'});
  I.fillField('name','edit user');
  I.click('Save changes', '.modal-footer');
  I.saveScreenshot('edituser.png');
  I.see('edit user');
});

Scenario('edit user', I => {
  I.click({xpath: '//*[@id="root"]/div/div/div/div/table/tbody/tr[2]/td[4]'});
  I.saveScreenshot('deleteuser.png');
});

Scenario('add user', I => {
  I.click('Add User');
  I.fillField('name','add user');
  I.click('Save changes', '.modal-footer');
  I.saveScreenshot('adduser.png');
});
