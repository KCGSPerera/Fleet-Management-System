import React, { useState, useEffect } from 'react';
import PieChart from '../../components/PieChart';
import { Box, Select, MenuItem, TextField, FormControl, InputLabel, useTheme } from '@mui/material';
import Header from '../../components/Header';

// You mentioned tokens in the initial code. Assuming it's a function that extracts some values based on the theme mode.
import { tokens } from '../../theme';

const Bar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);  // Use this colors object to customize your components if needed

    const [itemType, setItemType] = useState('tyres'); // default to 'tyres'
    const [brandQuantities, setBrandQuantities] = useState({
        Dunlop: 0,
        Michelin: 0,
        DSI: 0,
        Hankook: 0
    });

    const handleQuantityChange = (brand, value) => {
        setBrandQuantities(prev => ({
            ...prev,
            [brand]: value
        }));
    };

    const totalQuantity = Object.values(brandQuantities).reduce((a, b) => a + b, 0);

    const brandPercentages = {};
    for (const brand in brandQuantities) {
        brandPercentages[brand] = (brandQuantities[brand] / totalQuantity) * 100;
    }

    return (
        <Box m="20px" height="75vh" p="2px">
            <Header title="BAR CHART" subtitle="simple bar chart" />
            
            {/* Item Type Selector */}
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Item Type</InputLabel>
                <Select
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    label="Item Type"
                >
                    <MenuItem value="tyres">Tyres</MenuItem>
                    {/* Add other item types here */}
                </Select>
            </FormControl>

            {/* Quantity Inputs for each brand */}
            {Object.entries(brandQuantities).map(([brand, quantity]) => (
                <TextField
                    key={brand}
                    label={brand}
                    variant="outlined"
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(brand, parseInt(e.target.value, 10))}
                    fullWidth
                    margin="normal"
                />
            ))}
            
            <PieChart data={brandPercentages} />
        </Box>
    );
};

export default Bar;
