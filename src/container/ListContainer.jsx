import React from "react";

class ListContainer extends React.Component {
  render() {
    return (
      <>
        <div>losowe</div>
        <div>slowa</div>
        <ul>
          {this.props.todoes.map((element) => (
            <li>{element}</li>
          ))}

        </ul>
      </>
    );
  }
}

export default ListContainer;
