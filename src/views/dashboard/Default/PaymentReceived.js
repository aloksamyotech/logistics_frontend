import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography, Stack } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { t } from 'i18next';

const data = [
  { value: 5, label: 'Sun', color: '#5D3FD3' },
  { value: 10, label: 'Mon', color: '#008000' },
  { value: 15, label: 'Tue', color: '#C70039' },
  { value: 20, label: 'Wed', color: '#36b9cc' },
  { value: 25, label: 'Thu', color: '#c7b800' },
  { value: 30, label: 'Fri', color: '#00c782' },
  { value: 32, label: 'Sat', color: '#f6c23e' }
];

export default function PaymentReceived() {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.2rem', mb: 3 }}>
          {t('Payment Received')}
        </Typography>
        <Stack direction="row" justifyContent="center">
          <PieChart
            series={[
              {
                data: data,
                paddingAngle: 5,
                innerRadius: 50,
                outerRadius: 100
              }
            ]}
            margin={{ right: 5 }}
            width={300}
            height={320}
            legend={{ hidden: true }}
          />
        </Stack>

        <Grid container spacing={1} mt={2}>
          {data.map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item.label}>
              <Box display="flex" alignItems="center">
                <Box width={20} height={20} bgcolor={item.color} mr={1} borderRadius="50%" />
                <Typography variant="body2">{item.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
