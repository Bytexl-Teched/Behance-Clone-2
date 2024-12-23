import Book from "./bookSchema.js";
import User from "./userSchema.js";

User.belongsToMany(Book, { through: "UserLikedBooks", as: "likedBooks" });
Book.belongsToMany(User, { through: "UserLikedBooks", as: "usersWhoLike" });

export { User, Book };

// Sequelize automatically creates a set of methods on both the User and Book models. Here’s a breakdown of the methods generated due to the as aliases:

// Methods Generated on the User Model (as: "likedBooks")
// Since we specified "likedBooks" as the alias for the relationship on the User model, Sequelize will generate methods for managing the association between a User and their liked Books:

// user.getLikedBooks()
// Retrieves all books liked by the user.

// user.setLikedBooks(books)
// Replaces the user’s current liked books with the given list of books.

// user.addLikedBook(book)
// Adds a single book to the user’s liked books.

// user.addLikedBooks(books)
// Adds multiple books to the user’s liked books.

// user.removeLikedBook(book)
// Removes a single book from the user’s liked books.

// user.removeLikedBooks(books)
// Removes multiple books from the user’s liked books.

// user.hasLikedBook(book)
// Checks if a specific book is in the user’s liked books.

// user.hasLikedBooks(books)
// Checks if multiple books are in the user’s liked books.

// user.countLikedBooks()
// Counts the total number of books liked by the user.

// Methods Generated on the Book Model (as: "usersWhoLike")
// Similarly, since we specified "usersWhoLike" as the alias for the relationship on the Book model, Sequelize generates methods to manage the association between a Book and the Users who liked it:

// book.getUsersWhoLike()
// Retrieves all users who liked the book.

// book.setUsersWhoLike(users)
// Replaces the current users who like this book with the given list of users.

// book.addUserWhoLike(user)
// Adds a single user to the list of users who like this book.

// book.addUsersWhoLike(users)
// Adds multiple users to the list of users who like this book.

// book.removeUserWhoLike(user)
// Removes a single user from the list of users who like this book.

// book.removeUsersWhoLike(users)
// Removes multiple users from the list of users who like this book.

// book.hasUserWhoLike(user)
// Checks if a specific user has liked this book.

// book.hasUsersWhoLike(users)
// Checks if multiple users have liked this book.

// book.countUsersWhoLike()
// Counts the total number of users who liked the book.
