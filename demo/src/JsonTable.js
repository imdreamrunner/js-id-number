import React from 'react';

export default function JsonTable(json) {
  return (
    <table>
      <tbody>
        {
          Object.keys(json).map((key, index) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{json[key]}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
