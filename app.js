function Book(title, author, pages, read) {
  this.title = "My Deep Asshole"
  this.author = "Your Mom"
  this.pages = "10,000"
  this.read = "definitely read"
  
}
Book.prototype.info = function() {
  return `${title} by ${author}, ${pages} pages, ${read}`;
}
function DetailedBook(back, language) {
  this.back = back
  this.language = language
}
DetailedBook.prototype = new Book();
let thing = new DetailedBook("softback", "English");
console.log(thing.info());