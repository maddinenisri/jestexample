Feature('Acceptance Test');

Before((I) => {
  I.amOnPage('/');
});

Scenario('users are displayed', I => {
  I.waitForElement('.smallText', 30);
  I.see('User 4');
  I.saveScreenshot('usersloaded.png');
});

Scenario('edit user', I => {
  I.click({xpath: '(.//*[normalize-space(text()) and normalize-space(.)="User 2"])[1]/following::i[1]'});
  I.fillField('name','edit user');
  I.click('Save changes', '.modal-footer');
  I.saveScreenshot('edituser.png');
  I.see('edit user');
});

Scenario('edit user', I => {
  I.click({xpath: '(.//*[normalize-space(text()) and normalize-space(.)="User 3"])[1]/following::i[2]'});
  I.saveScreenshot('deleteuser.png');
  I.dontSee('User 3');
});

Scenario('add user', I => {
  I.click('Add User');
  I.fillField('name','add user');
  I.click('Save changes', '.modal-footer');
  I.saveScreenshot('adduser.png');
});

// https://hub.docker.com/r/codeception/codeceptjs