# theodinproject--api-key
1. For now, we’re going to keep all of this in a single HTML file
So go ahead and create one with a single blank image tag and an empty script tag in the body.
2. In the script tag, let’s start by selecting the image and assigning it to a variable so that we can change the URL once we’ve received it from the Giphy API.
3. Adding fetch with our URL from above is also relatively easy.
4. You should now be able to open the HTML file in your browser, and while you won’t see anything on the page, you should have something logged in the console. The trickiest part of this whole process is deciphering how to get to the data you desire from the server’s response. In this case, inspecting the browser’s console will reveal that what’s being returned is another Promise… to get the data we need another .then() function.
5. Now we have a JavaScript object and if you inspect it closely enough you’ll find that the data we need (an image URL) is nested rather deeply inside the object.
To get to the data we need to drill down through the layers of the object until we find what we want!
6. Running the file should now log the URL of the image. All that’s left to do is set the source of the image that’s on the page to the URL we’ve just accessed.
7. If all goes well, you should see a new image on the page every time you refresh.

  - While we are pushing this API key to the frontend, this isn’t something you should do with any key that is not free. Keys used on the client-side are considered public knowledge, so caution must be taken with sensitive and non-free keys. Handling keys without pushing them to the frontend will be taught in later sections if you haven’t already learned it in the Ruby course.
8. Add a button that fetches a new image without refreshing the page

9. Add a search box so users can search for specific gifs. You should also investigate adding a .catch() to the end of the promise chain in case Giphy doesn’t find any gifs with the searched keyword. Add a default image, or an error message if the search fails.

10. convert the promise based code into async/await compatible code