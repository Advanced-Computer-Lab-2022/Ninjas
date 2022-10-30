const DomainError = require("../error/domainError");
const { Account } = require("../models/account")

const adminCreateAccountsController =
{
   async adminCreateAccounts({ userType, accountType, username, password, firstName, lastName, gender, country }) {
      try {
         const notUnique = await Account.findOne({ username });

         if (!notUnique) {
            const saved = await Account.create({ username: username, password: password, firstName: firstName, lastName: lastName, gender: gender, country: country, type: accountType });

            return true;
         }
         throw new DomainError("username is not unique", 400);
      }
      catch (err) {
         if (err instanceof DomainError) { throw err; }
         if (err._message && err._message == 'Account validation failed') { throw new DomainError('validation Error', 400); }
         throw new DomainError('error internally', 500);

      }
   }
}
module.exports = adminCreateAccountsController;