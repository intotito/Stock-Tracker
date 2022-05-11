# Stock-Tracker
Year 2, Mobile Application Development Project

## Introduction
This application is based on the requirements for an end of Semester project on the module **Mobile Application Development 2** 
as part of the requirements for progression in **Software Design and Program Development Year II**, **Atlantic Technological University (ATU)**.
The project is on a Mobile Application designed with the Ionic Angular Framework (Minium version of 5.4) with clearly listed minimum 
capabilities. For high grading, the application is expected meet and surpass the minimum requirements which are listed as follows: 
- The Application must run
- The Application should use the following Angular/Ionic techniques
  1. Data Binding: both the one-way property and event binding and the two-way Banana in a Box binding.
  2. Navigation: the Application should navigate to different pages.
  3. Ionic Native/Cordova Plugin: At the students discretion, which Native/Cordova Plugin to implement. 
  4. The Application must use a `HttpClient` to fetch JSON data form an external URL. 
  5. Data Persistence: The Application must have some form of data persistence. 
- The Application must be structed in a standard organized and consistent fashion
- The Application must be created using the student ID Number (i.e the G00######)
## Application Structure
This Application is made up four pages, the [Home Page](src/app/home), [Search Symbol Page](src/app/search-symbol), 
[Select Stock Page](src/app/select-stock), and the [Quote Viewer](src/app/quote-viewer). 
For fetching data from external URL, the Application utilizes two Services: [Image Saver Service](src/app/Service/), 
[Quote Getter Service](src/app/Service) and [Symbol Getter Service](src/app/Service). 
Navigation within the pages starts from the Home Page with the option to go to the Select Stock Page with an already known
valid Symbol or search for a valid symbol using a company name in Search Symbol Page. A user can be directed to the Select Stock
Page from the Search Symbol Page by clicking on a searched symbol result, another option for the user will be to either memorize the 
search result or copy the the symbol with a copy button provided and then navigate back and forth to the Select Stock Page via the 
Home Page. The Quote Viewer Page is a leaf node in the Application navigational network structure, there is no forward navigation. 
### Home Page
The home page is the landing page of the app and provides link to the other pages in the application. 
The home page is basically made up of an image at the top of the page with two button stacked horizontally. The buttons provide means of 
navigating to other pages of the applicaiton namely Select Stock Page and Search Symbol Page. Consistent with Angular/Ionic standards
the template and business codes are separted into html and Typescript files
### Select Stock Page
This page basically contains two input fields and a select field. The first input field is where the user is expected to enter a valid
Stock Symbol and subsequent select and input field is where to specify interval (days, weeks or months) and duration (maximum of 100 days, 
weeks or months respectively). Then a button to fetch the data. 
### Search Symbol Page
The search symbol page provides a means to search for the proper symbol of a company by search with the company's name. 
An input field is provided in this page where the user is expected to enter the company name and a table will be displayed
showing all the relevant matches when the search is completed. The user can either click on a symbol to be navigated to the 
Select stock or either copy the symbol by clicking on the copy button provided as the last column of the search results.
### Quote Viewer Page
The Quote Viewer Page displays the fetched results from an API request in the form of a graph. The graph is plotted on value versus
time, the time on the horizontal axis while the value is plotted on the vertical axis. The page also displays the company information which
requires a separate API call. A brief summary of the stock for the provided period is also provided in the form of minimum, maximum and 
average values and %change for the period.

There are three different API calls required to display a stock information. 
- Search for stock information using a valid symbol (https://www.alphavantage.co/)
- Search for a valid symbol using company name (https://financialmodelingprep.com/api)
- Search for company information using a valid symbol (https://www.alphavantage.co/)
Although one API account was sufficient for the three requests, two different sources were used for load shedding, and stay within the limited number of
allowable calls during the development and deployment of the application. 
The API calls are accomplished using the services mentioned before. The Quote Getter Service is used to fetch stock and company information while the Symbol 
Getter Service is used for getting match symbol. 
