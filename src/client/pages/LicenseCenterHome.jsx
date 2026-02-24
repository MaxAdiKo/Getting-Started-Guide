import React from 'react';
import ActionCards from '../components/ActionCards.jsx';
import Overview from '../components/Overview.jsx';
import LicensesTable from '../components/LicensesTable.jsx';

export default function LicenseCenterHome({ navigate }) {
  return (
    <>
      <ActionCards navigate={navigate} />
      <Overview navigate={navigate} />
      <LicensesTable navigate={navigate} />
    </>
  );
}