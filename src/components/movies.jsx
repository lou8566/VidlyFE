import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import Pagination from "./common/pagination";
import Paginate from "../utils/paginate";
import Like from "./common/like";
import ListGroup from "./common/listGroup";


class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        selectedGenre: "All Genres"
     };

     componentDidMount(){
         this.setState({movies:getMovies(), genres: getGenres()})
     }

     handleDelete = movie => {
        console.log(movie);
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
     }

     handleLiked = movie => {
         console.log("Like Clicked for movie:", movie.title);
         const movies = [...this.state.movies];
         const index = movies.indexOf(movie);
         movies[index]  = {...movies[index]};
         movies[index].liked = !movies[index].liked;
         this.setState({movies});
     }

     handlePageChanged = page => {
         console.log("State", this.state.currentPage);
         this.setState({currentPage: page});
     }

     handleGenreSelect = (genre) => {
         console.log("Genre Selected:", genre);
     }

    render() {
        const { length: count} = this.state.movies;
        const {pageSize, currentPage, movies: allMovies, genres, selectedGenre } = this.state;

        const movies = Paginate(allMovies, currentPage, pageSize);

        if(count === 0) return <p>There are no movies in the database</p>;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-2">
                        <ListGroup 
                            items={genres} 
                            selected={selectedGenre}
                            onItemSelected={this.handleGenreSelect}
                            />
                    </div>
                    <div className="col-9">
                    <p>Showing {count} movies in the database</p>
              <table className="table">
                    <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th />
                        <th />
                    </tr>
                    
                    {movies.map(movie => (
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><Like liked={movie.liked} onClick={() => this.handleLiked(movie)} /></td>
                        <td><button onClick={() =>{
                            this.handleDelete({movie});
                        }} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination 
                    itemsCount={count} 
                    pageSize={pageSize} 
                    currentPage={currentPage}
                    onPageChanged={this.handlePageChanged} />

                
                    </div>
              
                </div>
                </React.Fragment>
          );
        }
}
 
export default Movies;