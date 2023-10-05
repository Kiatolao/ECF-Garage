import React from 'react';

export const Archived = ({ archivedTestimonials, deleteTestimonial }) => {
  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Nom</th>
          <th className="border border-gray-300 px-4 py-2">Commentaire</th>
          <th className="border border-gray-300 px-4 py-2">Note</th>
          <th className="border border-gray-300 px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {archivedTestimonials.map((testimonial) => (
          <tr key={testimonial.id} className="border border-gray-300">
            <td className="border border-gray-300 px-4 py-2">{testimonial.user}</td>
            <td className="border border-gray-300 px-4 py-2">{testimonial.testimonial}</td>
            <td className="border border-gray-300 px-4 py-2">{testimonial.note}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => deleteTestimonial(testimonial.id)}
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};