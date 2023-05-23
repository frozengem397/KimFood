import React from 'react'
import { useState,useEffect } from 'react';
import { useGetMenuItemsQuery } from '../../../apis/menuItemApi';
import {menuItemModel} from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import {useDispatch, useSelector} from "react-redux";
import {setMenuItem} from "../../../Storage/Redux/MenuItemSlice";
import { MainLoader } from './Common';
import { RootState } from '../../../Storage/Redux/store';

function MenuItemList() {
    const [menuItems,setMenuItems] = useState<menuItemModel[]>([]);
    const{data,isLoading} = useGetMenuItemsQuery(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categoryList,setCategoryList] = useState([""]);
    const dispatch = useDispatch();

    const searchValue = useSelector((state:RootState) => state.menuItemStore.search);

    useEffect(()=>{
      if(data && data.result){
        const tempMenuArray = handleFilters(selectedCategory,searchValue);
        setMenuItems(tempMenuArray);
        
      }
    },[searchValue]);

  useEffect(()=>{
    if(!isLoading){
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
      const tempCategoryList = ["All"];
      data.result.forEach((item:menuItemModel) => {
          if (tempCategoryList.indexOf(item.category) === -1) {
            tempCategoryList.push(item.category);            
          }
        })
        setCategoryList(tempCategoryList);
      
    }

  },[isLoading]);
  const handleCategory = (i:number) =>{
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button,index) =>{
      if(index ===i) {
        button.classList.add("active");
        if(index ===0){
          localCategory = "All"
        }
        else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);
        const tempArray = handleFilters(localCategory,searchValue);
        setMenuItems(tempArray);
      }
      else {
        button.classList.remove("active")
      }
      
    })

  }

  const handleFilters = (category:string, search: string) => {
    let tempArray = category ==="All"? [...data.result]:data.result.filter(
      (item:menuItemModel)=>
      item.category.toUpperCase() === category.toUpperCase()
    );
    if(search) {
      const tempSearchMenuItems = [...tempArray];
      tempArray = tempSearchMenuItems.filter((item:menuItemModel) => item.name.toUpperCase().includes(search.toUpperCase()));
    };
    return tempArray;
  }

  if (isLoading){
    return <MainLoader />
  }
  return (
    <><div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((categoryName, index) => (
            <li className = "nav-item" key = {index}>
              <button className = {`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && "active"
              }`} onClick={()=> handleCategory(index)}>
                {categoryName}
              </button>

            </li>


          ))}
        </ul>
      </div>
    </div><div className="container row">
        {menuItems.length > 0 && menuItems.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        )
        )}
      </div></>
  )
}

export default MenuItemList