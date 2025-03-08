import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import LoginDemo from '../auth/loginDemo';
import {Dashboard,Blogs,BlogEdit,BlogList,Media,Article,ArticleList,Property,Feature,FeatureList,PageNotFound} from '../AdminPages';
import Home from '../Web/home';
import {PropertyList} from '../AdminPages/Propertys/PropertyList';
import { PropertyEdit } from '../AdminPages/PropertyEdit/PropertyEdit';


const AllRouts = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<LoginDemo />} />
        <Route path="/demo" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/property" element={<Property />} />
        <Route path="/property-list" element={<PropertyList />} />
        <Route path="/property-edit/:id" element={<PropertyEdit />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogEdit />} />
        <Route path="/blogs-list" element={<BlogList />} />
        <Route path="/article" element={<Article />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/articles-list" element={<ArticleList />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/feature/:id" element={<Feature />} />
        <Route path="/feature-list" element={<FeatureList />} />
        <Route path="/media" element={<Media />} />
        <Route path="*" element={<PageNotFound title ="Page Not Found"/>} />
      </Routes>
    </>
  );
};

export default AllRouts;
