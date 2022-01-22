import { useRouter } from "next/router";
import Seo from './../../components/Seo';

export default function Detail({params,data}){
    const router=useRouter();
    const [title,id]=params||[];
    return (
    <div>
        <Seo title={title}/>
        <div className="movie" key={id}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            <h4>{data.original_title}</h4>
            <p>{data.overview}</p>
        </div>
        
    </div>
    );
}

export async function getServerSideProps({params:{params}}){
    const data=await (await fetch(`http://localhost:3000/api/movies/${params[1]}`)).json();
    return{
        props:{params,data}
    }
}