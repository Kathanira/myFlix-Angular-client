import { Injectable } from '@angular/core';

 import { catchError } from 'rxjs/operators';
 import {
   HttpClient,
   HttpHeaders,
   HttpErrorResponse,
 } from '@angular/common/http';
 import { Observable, throwError } from 'rxjs';
 import { map } from 'rxjs/operators';

 //Declaring the api url that will provide data for the client app
 const apiUrl = 'https://myflix-firstmovieapp.herokuapp.com/';
 @Injectable({
   providedIn: 'root',
 })
 export class FetchApiDataService {
   // Inject the HttpClient module to the constructor params
   // This will provide HttpClient to the entire class, making it available via this.http
   constructor(private http: HttpClient) {}

   /**
    * @service POST to the respective endpoint of apiUrl to register a new user
    * @param {any} userDetails
    * @returns a new user object in json format
    * @function userRegistration
    */
  
   // User registration
   public userRegistration(userDetails: any): Observable<any> {
     console.log(userDetails);
     return this.http
       .post(apiUrl + 'users', userDetails)
       .pipe(catchError(this.handleError));
   }

  /**
    * @service POST to the respective endpoint of apiUrl to login a user
    * @param {any} userDetails
    * @returns a user object in json format
    * @function userLogin
    */
  
   // User login
   public userLogin(userDetails: any): Observable<any> {
     console.log(userDetails);
     return this.http
       .post(apiUrl + 'login', userDetails)
       .pipe(catchError(this.handleError));
   }

    /**
    * @service GET to the respective endpoint of apiUrl to get all movies
    * @returns an array of all movies in json format
    * @function getAllMovies
    */

   // Get all movies
   getAllMovies(): Observable<any> {
     const token = localStorage.getItem('token');
     return this.http
       .get(apiUrl + 'movies', {
         headers: new HttpHeaders({
           Authorization: 'Bearer ' + token,
         }),
       })
       .pipe(map(this.extractResponseData), catchError(this.handleError));
   }

    /**
    * @service GET to the respective endpoint of apiUrl to get a movie by title
    * @param {string} title
    * @returns an array of movie objects in json format
    * @function getMovie
    */

   // Get one movie
   getOneMovie(Title: string): Observable<any> {
     const token = localStorage.getItem('token');
     return this.http
       .get(`${apiUrl}movies/${Title}`, {
         headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
       })
       .pipe(map(this.extractResponseData), catchError(this.handleError));
   }

    /**
    * @service GET to the respective endpoint of apiUrl to get director info
    * @param {string} directorName
    * @returns an array of movie objects in json format
    * @function getDirector
    */

   // Get director
   getDirector(directorName: string): Observable<any> {
     const token = localStorage.getItem('token');
     return this.http
       .get(`${apiUrl}movies/directors/${directorName}`, {
         headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
       })
       .pipe(map(this.extractResponseData), catchError(this.handleError));
   }

   /**
    * @service GET to the respective endpoint of apiUrl to get genre info
    * @param {string} genreName
    * @returns an array of movie objects in json format
    * @function getGenre
    */

   // Get genre
   getGenre(genreName: string): Observable<any> {
     const token = localStorage.getItem('token');
     return this.http
       .get(`${apiUrl}movies/genre/${genreName}`, {
         headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
       })
       .pipe(map(this.extractResponseData), catchError(this.handleError));
   }

 /**
    * @service GET to the respective endpoint of apiUrl to get a specific user
    * @returns a user object in json format
    * @function getUser
    */

   // Get user
   getUser(): Observable<any> {
     const username = localStorage.getItem('user');
     const token = localStorage.getItem('token');
     return this.http
       .get(`${apiUrl}users/${username}`, {
         headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
       })
       .pipe(map(this.extractResponseData), catchError(this.handleError));
   }

  /**
    * @service GET to the respective endpoint of apiUrl to get all favorite movies
    * @returns a list of movie ids
    * @function getFavoriteMovies
    */
  
   // Get favourite movies for a user
   getFavoriteMovies(): Observable<any> {
     const username = localStorage.getItem('user');
     const token = localStorage.getItem('token');
     return this.http
       .get(`${apiUrl}users/${username}/movies`, {
         headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
       })
       .pipe(map(this.extractResponseData), catchError(this.handleError));
   }

    /**
    * @service POST to the respective endpoint of apiUrl to add a movie to a user's favourites
    * @returns a user object in json format
    * @function addFavoriteMovie
    */

   // Add a movie to favourite Movies
   addFavoriteMovie(MovieID: string): Observable<any> {
     const username = localStorage.getItem('user');
     const token = localStorage.getItem('token');
     return this.http
       .put(`${apiUrl}users/${username}/movies/${MovieID}`, {
         headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
       })
       .pipe(map(this.extractResponseData), catchError(this.handleError));
   }

 /**
    * @service PUT to the respective endpoint of apiUrl to update a user's details
    * @returns a user object in json format
    * @function editUser
    */

   // Edit user
   editUser(updatedUser: any): Observable<any> {
     const username = localStorage.getItem('user');
     const token = localStorage.getItem('token');
     return this.http
       .put(`${apiUrl}users/${username}`, updatedUser, {
         headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
       })
       .pipe(map(this.extractResponseData), catchError(this.handleError));
   }

  /**
    * @service DELETE to the respective endpoint of apiUrl to delete a user
    * @returns success message
    * @function deleteUser
    */

   // Delete user
   deleteUser(): Observable<any> {
     const username = localStorage.getItem('user');
     const token = localStorage.getItem('token');
     return this.http
       .delete(`${apiUrl}users/${username}`, {
         headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
       })
       .pipe(map(this.extractResponseData), catchError(this.handleError));
   }

   /**
    * @service DELETE to the respective endpoint of apiUrl to remove a movie from a user's favourites
    * @returns a user object in json format
    * @function removeFavoriteMovie
    */

   // Remove a movie from the favorite movies
   removeFavoriteMovie(MovieID: string): Observable<any> {
     const username = localStorage.getItem('user');
     const token = localStorage.getItem('token');
     return this.http
       .delete(`${apiUrl}users/${username}/movies/${MovieID}`, {
         headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
       })
       .pipe(map(this.extractResponseData), catchError(this.handleError));
   }

   /**
    * Extracts response data from HTTP response
    * @param res
    * @returns response body or empty object
    */

   // Non-typed response extraction
   private extractResponseData(res: any): any {
     const body = res;
     return body || {};
   }

  /**
    * Error handler
    * @param error
    * @returns error message
    */

   private handleError(error: HttpErrorResponse): any {
     if (error.error instanceof ErrorEvent) {
       console.error('Some error occurred:', error.error.message);
     } else {
       console.error(
         `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
       );
     }
     return throwError('Something bad happened; please try again later.');
   }
 }