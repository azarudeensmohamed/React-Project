import React, { useState, useEffect } from 'react';
import apiClient from '../../Components/apiClient';
import { handleApiRequestGet } from '../../Helper/HelperGetFunction';

const FeatureItem = ({ feature, isSelected, onCheckboxChange }) => {
  return (
    <div className="col-3 mb-3">
      <input
        type="checkbox"
        className="check-feature"
        value={feature.id}
        checked={isSelected}
        name={feature.title}
        id={`${feature.title}${feature.id}`}
        onChange={(e) => onCheckboxChange(feature.id, e.target.checked)}
      />
      <label htmlFor={`${feature.title}${feature.id}`}>{feature.title || 'Default Label'}</label>
    </div>
  );
};

const Feature = ({setfeature,feature,selectedFeatures,setSelectedFeatures,handleSubmit}) => {

  useEffect(() => {
    const getUrl = 'feature-get-data';
    handleApiRequestGet(
      apiClient,
      getUrl,
      (data) => {
        if (data.status === 'success') {
            setfeature(data.data);
        } else {
          console.error('Error fetching data:', data);
        }
      },
      (error) => {
        console.error('Data fetch failed:', error?.response?.data || error);
      }
    );
  }, []);

  const handleFeatureSelect = (featureId, checked) => {
    setSelectedFeatures((prevSelected) =>
      checked
        ? [...prevSelected, featureId]
        : prevSelected.filter((id) => id !== featureId)
    );
  };
  const handleSelectAll = () => {
    if (selectedFeatures.length === feature.length) {
      setSelectedFeatures([]);
    } else {
      setSelectedFeatures(feature.map((feature) => feature.id));
    }
  };


  return (
    <div className="card card-tap-height">
      <div className="card-header border-bottom border-dashed">
        <h4 className="card-title mb-0">Project Features</h4>
      </div>
      <div className="card-body">
        {/* Select All Button */}
        <div className="mb-3">
          <button className="btn btn-primary" type='button' onClick={handleSelectAll}>
            {selectedFeatures.length === feature.length
              ? 'Deselect All'
              : 'Select All'}
          </button>
        </div>
        <div className="row">
          {feature.map((feature, index) => (
            <FeatureItem
              key={index}
              feature={feature}
              isSelected={selectedFeatures.includes(feature.id)}
              onCheckboxChange={handleFeatureSelect}
            />
          ))}
        </div>
        <div className="col-lg-4 col-md-4 col-12">
            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>submit</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
