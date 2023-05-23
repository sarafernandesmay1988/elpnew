import React from 'react'
// import "./para.css"
import {useState, useEffect, useRef} from 'react';

const Para = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [paraData, setparaData] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. In adipisci magnam doloremque qui consectetur recusandae consequatur corporis nisi nobis temporibus aliquam quibusdam provident voluptatem at praesentium placeat, delectus fugiat magni, reiciendis sint eum sed nostrum voluptatibus eligendi recusandae tempore cumque! Error fugiat ut voluptatibus ipsam recusandae iure perferendis harum, deserunt mollitia nobis, nulla beatae? Adipisci, beatae eaque quae, iste tempore dolorum similique aut sit a fugiat praesentium recusandae? Vero rem ducimus explicabo sequi ipsam delectus quia possimus laboriosam sint eum odio repellendus dolore distinctio quo ut harum mollitia nemo veniam, quibusdam voluptate consectetur. Perspiciatis pariatur, molestiae, veniam recusandae repellat voluptates ut ducimus, sed nulla delectus sint unde vitae esse. Molestias, provident tenetur unde quidem error ipsa quasi facere delectus quia officia officiis quo consectetur sequi sit. Nisi minima totam voluptatibus ab debitis sequi quae nihil repellat earum, quas ullam voluptate iusto magnam quos minus corporis fuga officiis consectetur officia, perferendis expedita obcaecati? Laboriosam iusto nihil eos repudiandae ullam cumque quisquam omnis, tempora commodi optio magnam numquam sint totam placeat, impedit quod tempore recusandae, sunt architecto expedita. Rerum illum ipsum, libero, voluptas a numquam aspernatur repellendus, sequi in veniam sit facilis maiores molestias quisquam soluta beatae quaerat ullam aperiam tenetur suscipit praesentium. Voluptatibus cupiditate fugiat accusamus minus at nulla animi alias eligendi, quidem, voluptates repudiandae. Magnam iusto distinctio fugit ipsum, soluta eveniet perferendis recusandae dignissimos modi aliquid vel similique qui eius harum sapiente nam molestias, eligendi amet quis quaerat illo architecto. Nihil modi officia quia ea. Sit mollitia assumenda eos architecto deleniti odit eligendi quibusdam itaque! Molestiae consequuntur odit cum? Quis quas perferendis officia repudiandae est id fugiat molestiae tempora! Neque consequuntur quisquam excepturi eligendi perferendis voluptatem, quod animi qui ex iste, dicta nihil aut nesciunt architecto omnis magni quaerat maiores quis dolor ab natus incidunt recusandae dolorem. Non maxime id voluptatem earum autem magni, nesciunt a consectetur quod neque accusamus, sint")
    const [paradata1, setparadata]=useState("")

    useEffect(() => {
      window.screen.width <= 760 ? setIsMobile(true) : setIsMobile(false);
    }, [window.screen.width]);

    function detectWindowSize() {
        window.innerWidth <= 760 ? setIsMobile(true) : setIsMobile(false);        
    }
    
    window.onresize = detectWindowSize;
console.log(window)
    console.log(isMobile)

    useEffect(() => {
        if(isMobile)
        {
            let temp=paraData.slice(1,200)
            setparadata(temp)
            
        }
    },[isMobile])
  return (
    <div className="p-container">
    <p >
        {
            isMobile ? paradata1 : paraData
        }
       
    </p>
   {
    isMobile && (
        <div className="btn-view">
        <button onClick={() => setIsMobile(false) }>View More</button>
        </div>
    )
   }
  
</div>
  )
}

export default Para