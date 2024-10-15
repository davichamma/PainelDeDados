import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { IonIcon } from '@ionic/react';
import * as allIcons from 'ionicons/icons';

const iconsArray = Object.values(allIcons); // Array of all icons

const IconGrid = ({ onSelectIcon }) => {
  const columnCount = 3;
  const rowCount = Math.ceil(iconsArray.length / columnCount);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const iconIndex = rowIndex * columnCount + columnIndex;
    const icon = iconsArray[iconIndex];

    return (
      <div style={style} onClick={() => onSelectIcon(icon)}>
        {icon && <IonIcon icon={icon} style={{ fontSize: '24px' }} />}
      </div>
    );
  };

  return (
    <Grid
      columnCount={columnCount}
      columnWidth={100}
      height={300}
      rowCount={rowCount}
      rowHeight={100}
      width={300}
    >
      {Cell}
    </Grid>
  );
};

export default IconGrid;
