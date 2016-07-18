var NumberCondition = React.createClass({
  onKeyUp: function(e) {
    var conditions = this.props.conditions;
    conditions[this.props.target] = e.target.value;
    this.props.search();
  },
  render: function() {
    return (
      <label>{this.props.subject}
        <input type="number" name={this.props.target}
         min={this.props.min} max={this.props.max} step={this.props.step}
         value={this.props.condition} onKeyUp={this.onKeyUp} />
      </label>
    );
  }
});

var TextCondition = React.createClass({
  onKeyUp: function(e) {
    this.props.conditions[this.props.target] = e.target.value;
    this.props.search();
  },
  render: function() {
    return (
      <label>{this.props.subject}
        <input type="text" name={this.props.target} value={this.props.condition} onKeyUp={this.onKeyUp} />
      </label>
    );
  }
});

var SearchConditions = React.createClass({
  render: function(){
    return(
      <div>
        <TextCondition subject="名前" target="name" conditions={this.props.conditions} search={this.props.search} />
        <TextCondition subject="名前(カナ)" target="name_kana" conditions={this.props.conditions} search={this.props.search} />
        <TextCondition subject="メール" target="mail" conditions={this.props.conditions} search={this.props.search} />
        <TextCondition subject="住所" target="address1" conditions={this.props.conditions} search={this.props.search} />
        <NumberCondition subject="年齢" target="age" conditions={this.props.conditions} search={this.props.search} />
        <NumberCondition subject="1ページの件数" target="per" min="10" max="500" step="5" conditions={this.props.conditions} search={this.props.search} />
        <NumberCondition subject="ページ数" target="page" min="1" conditions={this.props.conditions} search={this.props.search} />
      </div>
    );
  }
});

var DataTable = React.createClass({
  render: function(){
    return(
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>名前</th>
            <th>名前（カタカナ）</th>
            <th>性別</th>
            <th>携帯電話</th>
            <th>メールアドレス</th>
            <th>郵便番号</th>
            <th>住所1</th>
            <th>住所2</th>
            <th>住所3</th>
            <th>住所4</th>
            <th>住所5</th>
            <th>年齢</th>
          </tr>
        </thead>
        <tbody>
          {
            $.map(this.props.results, (result, index) => {
              return React.createElement(DataRow, { data: result, key: index });
            })
          }
        </tbody>
      </table>
    );
  }
});

var DataRow = React.createClass({
  render: function(){
    return(
      <tr>
        <td>{this.props.data["id"]}</td>
        <td>{this.props.data["name"]}</td>
        <td>{this.props.data["name_kana"]}</td>
        <td>{this.props.data["gender"]}</td>
        <td>{this.props.data["phone"]}</td>
        <td>{this.props.data["mail"]}</td>
        <td>{this.props.data["zipcode"]}</td>
        <td>{this.props.data["address1"]}</td>
        <td>{this.props.data["address2"]}</td>
        <td>{this.props.data["address3"]}</td>
        <td>{this.props.data["address4"]}</td>
        <td>{this.props.data["address5"]}</td>
        <td>{this.props.data["age"]}</td>
      </tr>
    )
  }
});

var AddressSearch = React.createClass({
  getInitialState: function(){
    return { conditions: {} };
  },
  componentDidMount: function(){
    this.search();
  },
  search: function(){
    var self = this;
    $.ajax({
      type: 'GET',
      url: 'http://54.199.208.34:3000/addresses.json',
      data: this.state.conditions,
      dataType: 'json',
      success: function(response){
        self.setState({results: response["results"]});
      }
    });
  },
  render: function(){
    var results = {};
    return(
      <div>
        <SearchConditions conditions={this.state.conditions} search={this.search} />
        <DataTable results={this.state.results} />
      </div>
    )
  }
});

ReactDOM.render(
  <AddressSearch />, document.getElementById("content")
);
