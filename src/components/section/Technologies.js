// Technologies.js
import React from 'react';
import PropTypes from 'prop-types';

const Technologies = ({ techArr }) => (
  <div className='fullPage' id='technologiesPage'>
    <h2 id='technologies-heading'>Technologies</h2>
    <ul className='technologies'>
      { techArr.map((item, key) => item.show
      && <li key={key}>
          <a href={item.techUrl}><img src={item.url} key={key} /></a></li>)}
    </ul>
  </div>
);

Technologies.propTypes = {
  techArr: PropTypes.array
};

export default Technologies;
