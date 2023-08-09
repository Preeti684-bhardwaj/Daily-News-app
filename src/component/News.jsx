import React, { useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=> {
 const [articles,setArticles]=useState([]);
 const [loading,setLoading]=useState(true);
 const [page,setpage]=useState(1);
 const [totalResults,setTotalResults]=useState(0);



 News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }

 News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // document.title = `${this.capitalizeFirstLetter(props.category)} - DailyNews`
  

  const updateNews=async ()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  const fetchMoreData = async () => {
    setpage( page + 1 );
    // props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    // props.setProgress(30);
    let parsedData = await data.json();
    // props.setProgress(70);
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    // props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - DailyNews`
    updateNews()
    // eslint-disable-next-line
  },[])

    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop:'90px' }}>News - Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-5">
              {articles.map((e) => {
                return <div className="col-md-4 mb-3" key={e.url} >
                  <NewsItem title={e.title ? e.title.slice(0, 44) : " "} description={e.description ? e.description.slice(0, 80) : " "} imgUrl={!e.urlToImage ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }

export default News
