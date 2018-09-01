import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {
      props.repos.map(repo => <Repo repo={repo.name} url={repo.url}/>)
    }
  </div>
)

const Repo = (props) => (
  <div>
    <a href={props.url} target='_blank'>{props.repo}</a>
  </div>
)

export default RepoList;

<a href="#" onclick="console.log('The link was clicked.')">
  Click me 
</a>