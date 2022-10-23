const { Account } = require("../models/account")

const adminCreateAccountsController = 
{
   async adminCreateAccounts (userType,accountType,username,password,firstName,lastName,gender,country)
   {try{
         const notUnique = Account.findOne({ username });
         if(!notUnique){
         const saved = new Account({type:accountType,username,password,firstName,lastName,gender,country});
          saved.save;
          return true;
        }
        return false;
    }
    catch(err)
    {
        throw err;
    }
   }
}
module.exports = adminCreateAccountsController;