import { useEffect, useState } from 'react';
import Seo from './../components/Seo';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({results}){
    const router=useRouter();
    const onClick=(id,title)=>{
        router.push(`/movies/${title}/${id}`);
    }
    /*const [movies,setMovies]=useState([]);
    useEffect(()=>{
        (async()=>{
            const {results}=await (await fetch("/api/movies")).json();
            console.log(results);

            setMovies(results);
        })();
    },[])*/

    return (
        <div className="container">
            <Seo title="Home"/>
            {/*!movies && <h4>Loading...</h4>*/}
            {results?.map((movie)=>(
                <div onClick={()=>{onClick(movie.id,movie.original_title)}} className="movie" key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    <Link href={//이 부분 onClick 함수랑 같음 div자체가 movie title을 포함함
                        `/movies/${movie.original_title}/${movie.id}`}>
                        <a><h4>{movie.original_title}</h4></a>
                    </Link>
                </div>
            ))}
            <style jsx>{`
            .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 20px;
                gap: 20px;
            }
            .movie{
                cursor:pointer;
            }
            .movie img {
                max-width: 100%;
                border-radius: 12px;
                transition: transform 0.2s ease-in-out;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            }
            .movie:hover img {
                transform: scale(1.05) translateY(-10px);
            }
            .movie h4 {
                font-size: 18px;
                text-align: center;
            }
        `}</style>
     </div>
    );
}

export async function getServerSideProps(){//이름 중요
    const {results}=await (await fetch("http://localhost:3000/api/movies")).json();
    return{
        props:{results}
    }
}