const User = require("./User");
const Category = require("./Category");
const Objective = require("./Objective");
const TransactionType = require("./TransactionType");
const Expense = require("./Expense");
const InCome = require("./InCome");




//InCome => UsersId
InCome.belongsTo(User) 
User.hasMany(InCome)

//InCome => CategoryId
InCome.belongsTo(Category)
Category.hasMany(InCome)

//Objective => UsersId
Objective.belongsTo(User)
User.hasMany(Objective)

//TransactionType => ExpensesId
TransactionType.belongsTo(Expense)
Expense.hasMany(TransactionType)

//TransactionType => InComeId
TransactionType.belongsTo(InCome)
InCome.hasMany(TransactionType)

//Expenses => UsersId
Expense.belongsTo(User) 
User.hasMany(Expense)

//Expenses => CategoryId
Expense.belongsTo(Category)
Category.hasMany(Expense)