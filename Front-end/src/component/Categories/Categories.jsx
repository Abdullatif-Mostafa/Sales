import React from 'react'
import ProductCard from '../Products/ProductCard'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Container } from 'react-bootstrap';

function Categories() {

    const {category}=useParams();
    console.log("category ",category)
    console.log("category ",category);
    const data = useSelector((state) => state.products.items);
    console.log(" the data is ",data);
    const categories=data.filter((item)=>{return item.category===category})
    console.log("categories ",categories);
  return (
    <div style={{marginTop:"77px",paddingTop:"20px",minHeight:"100vh"}}>
        <Container>
            <h2 style={{textAlign:"center",textTransform:"capitalize",marginBottom:"40px"}}>{category } Categories</h2>
            <div className='row'>
                {
                    categories.map((product)=>{
                        return(<ProductCard product={product}/>
                        )
                    })
                }

            </div>
        </Container>
    </div>
  )
}

export default Categories