import logo from './unavailable.jpg'
import React from 'react'
import '../App.css'

const Newsitem = (props) => {

    


    let {title, description, imageUrl, newsUrl, date, author, source} = props;

    
    
    return (
        <div className="card my-3" style={{margin: "0 auto"}}>
        <img src={imageUrl?imageUrl:logo} className="card-img-top" alt="..."/>
        <div className="card-body">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"85%", zIndex:"1"}}>{source}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='text-muted'>By {author?author:"Unknown"} on {new Date (date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark readMoreBtn">Read more</a>
        </div>
        </div>
    )

}

export default Newsitem