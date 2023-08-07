import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
  constructor(){
    super();
    console.log('Hello I am a constructor from component');
    this.state={
        articles:[],
        loading:false
    }
  }
  async componentDidMount(){
    console.log('cdm');
    let url="https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=5e40e8ab4e574139938bed57f8d3c9e0";
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles})
  }
    render() {
    return (
        <div className="container my-2">
        <h1>News - Top Headlines</h1>
        <div className="row">
            {this.state.articles.map((e)=>{
                return <div className="col-md-4 mb-3" key={e.url} >
                <NewsItem title={e.title?e.title.slice(0,44):""} description={e.description?e.description.slice(0,80):""} imgUrl={e.urlToImage} newsUrl={e.url} />
              </div>
            })}
  
        </div>
      </div>
       
    )
  }
}

export default News
