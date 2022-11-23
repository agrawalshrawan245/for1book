# MongoDB functions

| Function use             | Function                                              |
| ------------------------ | ----------------------------------------------------- |
| How to save              | `await new User({...object}).save()`                  |
| How to find by one param | `await User.findOne({email})`                         |
| Find by id               | `await User.findById(_id)`                            |
| Find all                 | `await User.find()`                                   |
| How to save              | `await user_obj.save()`                               |
| How to regex             | `await User.find({$or:[regex1, regex2...]})`          |
| How to select            | `await User.find({searchParam}, {name:1, cage:1...})` |
| How to limit             | `await User.find().limit(4)`                          |
| How to sort              | `await User.find().sort( { name : [1/-1] } )`         |
| How to delete            | `await user_obj.remove()`                             |

## Complex quries

| Function use                   | Function                                                          |
| ------------------------------ | ----------------------------------------------------------------- |
| Name in list                   | `await User.find({name:{$in:[n1, n2, n2]}})`                      |
| Name not in list               | `await User.find({name:{$nin:[n1, n2, n2]}})`                     |
| Returns elements that have age | `await User.find({name:{$exists:true}})`                          |
| Return if age is in the range  | `await User.find({age:{$gt:20,$lt:40}, name:{&in:[n1, n2, n3]}})` |
| Not query                      | `await User.find({age:{$not:{$gte:20}}})`                         |
