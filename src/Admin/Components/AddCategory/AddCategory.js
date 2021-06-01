import React, { useEffect, useState } from 'react'
import {db} from '../../../Database/firebase'
import './AddCategory.css';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const useStyles = {
    textAlign: 'center',
}

function AddCategory() {
    
    const[subcategorystate, setsubcategorystate] = useState([{subcategoryname : "", taginput: "" , subcategorycomponent : []}])

    const [state, setState] = useState({
        category: "",
        subcategory: ""
    })
    
    const [dbstate, setdbstate] = useState([]);

    useEffect(() =>{
        db.collection('AdminController').doc("Category").onSnapshot(snap => (
            setdbstate(snap.data().category)
        ))
    }, [])

    const [category, setcategory] = useState("");

    const handleInputChange = (e, index) => {
            const { name, value } = e.target;
            const list = [...subcategorystate];
            list[index][name] = value;
            setsubcategorystate(list);
    };

    const handleRemoveClick = index => {
        const list = [...subcategorystate];
        list.splice(index, 1);
        setsubcategorystate(list);
    };


    const handleAddClick = () => {
        setsubcategorystate([...subcategorystate, {subcategoryname : "", subcategorycomponent : []}]);
    };

    const inputKeyDown = (e, index) => {
        const val = e.target.value;

        if (e.key === 'Enter' && val) 
        {   const list = [...subcategorystate];
            if(list[index]["subcategorycomponent"].find(tag => tag.toLowerCase() === val.toLowerCase())){
                return;
            }
            list[index]["subcategorycomponent"] = [...list[index]["subcategorycomponent"], val];
            console.log(list[index]["subcategorycomponent"])
            console.log(list)
            list[index]["taginput"] = "";
            setsubcategorystate(list)
            console.log(subcategorystate)
        } 
    }

    const removeTag = (i,j) => {
        const list = [...subcategorystate];
        list[i]["subcategorycomponent"].splice(j, 1);
        setsubcategorystate(list)
    }

    const handleSubmit = (e) => {
        setState({category: category, subcategory: [...subcategorystate]})
        db.collection('AdminController').doc("Category").set({category : [...dbstate, state]})
    };

    console.log(dbstate)


    return (
        <div>
        <div className="add">
            <h1>Enter New Category</h1>
        <div className="addform">
            
        {/* <div>Enter Category</div> */}
        <div className="caterogytype">
                <input value={category} placeholder="Enter Category" onChange={e => setcategory(e.target.value)}/>
                
        </div>

            {subcategorystate.map((x, i) => {
                return (
                    <div className="categorySubtype">
                        {/* <div>Enter Sub Cateogry Title</div> */}
                        <div className="caterogytype">
                                <input name="subcategoryname" placeholder="Enter subcategory title" value={x.subcategoryname} onChange={e => handleInputChange(e, i)} required/>
                                <div className="btn-box">
                                    { <button className="mr10" onClick={() => handleRemoveClick(i)}><DeleteIcon/></button>}
                                </div>
                        </div>
                        
                        <div className="lastype">
                            {/* <div>Enter Sub Category</div> */}
                        <div className="input-tag">
                        <ul className="input-tag__tags">
                                {x.subcategorycomponent.map((d,j)=> (
                                <li key={j}>
                                    {d}
                                    <button type="button" onClick={() => {removeTag(i,j);}} >+</button>
                                </li>))}
                        </ul>
                        <input type="text" placeholder="Enter sub component" name="taginput"  value={x.taginput}
                                onChange={e => handleInputChange(e, i)} required onKeyDown={e=> inputKeyDown(e, i)}/>
                        </div>
                        </div>
                    </div>
                );
            })}
            <div className="buttonAssemble">
            <button className="subbutton" onClick={handleAddClick}><AddCircleIcon className={useStyles} /> Add SubCateory</button>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            </div>
            </div>

    </div>
    )
}

export default AddCategory
