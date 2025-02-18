import { connectToDatabase } from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { scheduleId, status } = req.body;

    if (!scheduleId || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate status
    const validStatuses = ['Early', 'On Time', 'Over Time'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const { db } = await connectToDatabase();

    const result = await db.collection('schedules').updateOne(
      { _id: new ObjectId(scheduleId) },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    return res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating schedule status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
