import React from 'react';
import { assignmentAtom } from '../../../../../../recoil/atoms/assignmentAtom';
import { useRecoilState } from 'recoil';
import { Card, CardContent, Typography, Box } from '@mui/material';

export const Assignment = () => {
  const [assignment, setAssignment] = useRecoilState(assignmentAtom);

  return (
    <div className="py-6">
      <div className="max-w-5xl">
        {assignment && assignment.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignment.map((item) => (
              <Card 
                key={item._id} 
                className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
                sx={{ borderRadius: '16px', overflow: 'hidden' }}
              >
                <CardContent>
                  <Typography variant="h6" className="font-bold text-indigo-600">
                    {item.title}
                  </Typography>
                  <Box className="mt-2">
                    <Typography variant="body2" className="text-gray-700">
                      <strong>Class:</strong> {item.classes.className}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                      <strong>Subject:</strong> {item.classes.subName}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    className="mt-4 text-gray-600"
                  >
                    {item.description}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    className="mt-2 text-gray-500"
                  >
                    <strong>Due Date:</strong> {new Date(item.dueDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No assignments available.</p>
        )}
      </div>
    </div>
  );
};
