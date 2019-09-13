interface IState {
  dataSource: any;
}

const initialState: IState = {
  dataSource: [
    {
      key: "1",
      title: "Mr.",
      name: "Petr",
      surname: "petr",
      email: "peter@gmail.com",
      link: "/user.png",
      client: "foreway",
      department: "sytemAdministrator",
      phoneNumber: "1234567890",
      Language: "English",
      TimeZone: "UTC",
      UnitSystem: "Metric"
    },
    {
      key: "2",
      title: "Mr",
      name: "John",
      surname: "petr",
      email: "john@gmail.com",
      link: "/user.png",
      client: "foreway",
      department: "sytemAdministrator",
      phoneNumber: "1234567890",
      Language: "English",
      TimeZone: "UTC",
      UnitSystem: "Metric"
    },
    {
      key: "3",
      title: "Mr",
      name: "Some",
      surname: "One",
      email: "some@gmail.com",
      link: "/user.png",
      client: "foreway",
      department: "sytemAdministrator",
      phoneNumber: "1234567890",
      Language: "English",
      TimeZone: "UTC",
      UnitSystem: "Metric"
    },
    {
      key: "4",
      title: "Mr",
      name: "Anonymous",
      surname: "petr",
      email: "anonymous@gmail.com",
      link: "/user.png",
      client: "foreway",
      department: "sytemAdministrator",
      phoneNumber: "1234567890",
      Language: "English",
      TimeZone: "UTC",
      UnitSystem: "Metric"
    },
    {
      key: "5",
      title: "Mrs",
      name: "Alice",
      surname: "petr",
      email: "alice@gmail.com",
      link: "/user.png",
      client: "foreway",
      department: "sytemAdministrator",
      phoneNumber: "1234567890",
      Language: "English",
      TimeZone: "UTC",
      UnitSystem: "Metric"
    },
    {
      key: "6",
      title: "Mr",
      name: "Bob",
      surname: "petr",
      email: "bob@gmail.com",
      link: "/user.png",
      client: "foreway",
      department: "sytemAdministrator",
      phoneNumber: "1234567890",
      Language: "English",
      TimeZone: "UTC",
      UnitSystem: "Metric"
    },
    {
      key: "7",
      title: "Mrs",
      name: "Carol",
      surname: "petr",
      email: "carol@gmail.com",
      link: "/user.png",
      client: "foreway",
      department: "sytemAdministrator",
      phoneNumber: "1234567890",
      Language: "English",
      TimeZone: "UTC",
      UnitSystem: "Metric"
    },
    {
      key: "8",
      title: "Mr",
      name: "Dave",
      surname: "petr",
      email: "dave@gmail.com",
      link: "/user.png",
      client: "foreway",
      department: "sytemAdministrator",
      phoneNumber: "1234567890",
      Language: "English",
      TimeZone: "UTC",
      UnitSystem: "Metric"
    },
    {
      key: "9",
      title: "Mrs",
      name: "Eve",
      surname: "petr",
      email: "eve@gmail.com",
      link: "/user.png",
      client: "foreway",
      department: "sytemAdministrator",
      phoneNumber: "1234567890",
      Language: "English",
      TimeZone: "UTC",
      UnitSystem: "Metric"
    }
  ]
};

export default function aois(
  state: IState = initialState,
  action: any
): IState {
  const { type } = action;

  switch (type) {
    case "DELETE_USER": {
      const newlist = [...state.dataSource];
      newlist.splice(action.payload, 1);
      return {
        ...state,
        dataSource: newlist
      };
    }

    case "EDIT_USER": {
      const newlistUser = [...state.dataSource];
      newlistUser.forEach((items, i) => {
        if (i === action.editindex) {
          newlistUser[i] = action.payload;
        }
      });
      return {
        ...state,
        dataSource: newlistUser
      };
    }

    case "CREATE_USER":
      return { ...state, dataSource: [action.payload, ...state.dataSource] };

    default:
      return state;
  }
}
