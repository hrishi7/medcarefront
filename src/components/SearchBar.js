import React,{useState, useEffect} from "react";
import Select from "react-select";
import { makeStyles, Grid } from "@material-ui/core/";


import {useSelector} from 'react-redux';

const useStyles = makeStyles( theme => ({
  search: {
    width: theme.spacing(30)
  },
  searchIcon: {
    paddingLeft: theme.spacing(0.5),
    paddingTop: theme.spacing(1),
    fontSize: theme.spacing(3)
  }
}));

export default function SearchBar (props) {
  const classes = useStyles();
  let state = useSelector(state=> state);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(()=>{
    setOptions(state.products);
  },[])

  const handleSearch = e => {
    setSelectedOption(e );
  };

    return (
      <Grid container>
        <Grid item xs className={classes.search}>
          <Select
            value={selectedOption}
            onChange={e => handleSearch(e)}
            options={options.map(d => ({
              value: d.name,
              label: d.name
            }))}
            isSearchable
            isClearable
            placeholder="Search Medicine"
            autoFocus
          />
        </Grid>
      </Grid>
    );

}
