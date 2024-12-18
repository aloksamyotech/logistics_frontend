import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const data = [
  { day: 'Sun', business: 0 },
  { day: 'Mon', business: 0 },
  { day: 'Tue', business: 0 },
  { day: 'Wed', business: 0 },
  { day: 'Thu', business: 0 },
  { day: 'Fri', business: 0 },
  { day: 'Sat', business: 0 }
];

const ShipmentsOverview = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.2rem', mb: 3 }}>
          Shipments Overview
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day">
              <Label value="Days" offset={-2} position="insideBottom"/>
            </XAxis>
            <YAxis>
              <Label value="Business" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="business"
              stroke="#4caf50"
              strokeWidth={2}
              dot={{ stroke: '#4caf50', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8 }}
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ShipmentsOverview;
