import React, { Component } from 'react';
import contacts from '../contacts.json';
import ContactCard from './ContactCard';

//show 5 at the start
class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactsLimit: contacts.slice(0, 5),
    };
  }

  //add random actor
  addRandom = () => {
    const contactsCopy = [...this.state.contactsLimit];
    const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
    if (!contactsCopy.includes(randomContact)) {
      contactsCopy.push(randomContact);
    }

    this.setState({ contactsLimit: contactsCopy });
  };

  //sort by name
  sortName = () => {
    const contactsCopy = [...this.state.contactsLimit];
    contactsCopy.sort((a, b) => a.name.localeCompare(b.name));
    this.setState({ contactsLimit: contactsCopy });
  };

  //sort popularity
  sortPopularity = () => {
    const contactsCopy = [...this.state.contactsLimit];
    contactsCopy.sort((a, b) => b.popularity - a.popularity);
    this.setState({ contactsLimit: contactsCopy });
  };
  //delete
  deleteActor = (actorID) => {
    const deleted = this.state.contactsLimit.filter(
      (actor) => actor.id !== actorID
    );
    this.setState({ contactsLimit: deleted });
  };

  //make stuff happen
  render() {
    return (
      <div>
        <div className="btns">
          <button onClick={this.addRandom}>Random</button>
          <button onClick={this.sortName}>Sort by Name</button>
          <button onClick={this.sortPopularity}>Sort by Popularity</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contactsLimit.map((oneContact, index) => {
              return (
                <ContactCard
                  contact={oneContact}
                  key={oneContact.id}
                  clickToDelete={() => this.deleteActor(oneContact.id)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ContactList;
