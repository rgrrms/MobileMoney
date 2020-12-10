import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";
import Values from "../components/Values";
import Item from "../components/Item";
import Header from "../components/Header";
import api from "../services/api";
import {useRoute} from "@react-navigation/native";
import {AntDesign as Icon} from "@expo/vector-icons";

const Data = ["11/2020","12/2020","01/2021","02/2021","03/2021","04/2021","05/2021"]
const DataFormat = ["2020-11","2020-12","2021-01","2021-02","2021-03","2021-04","2021-05"]

const TimeLine = () => {
  const [balance, setBalance] = useState();
  const [numberPut, setNumberPut] = useState();
  const [expense, setExpense] = useState();
  const [revenue, setRevenue] = useState();

  const [finances, setFinances] = useState();
  const [financesFilter, setFinancesFilter] = useState();

  const route = useRoute();

  const [value, setValue] = useState(0)
  const [data, setData] = useState(Data[value]);
  const [dataFormat, setDataFormat] = useState(DataFormat[value]);

  const [filter, setFilter] = useState();

  const routeParams = route.params;

  function count(sinal) {
    let v = value;
    if (sinal === "+") {
      v++;
      setData(Data[v]);
      setDataFormat(DataFormat[v]);
      setValue(v);
    } else {
      v--;
      setData(Data[v]);
      setDataFormat(DataFormat[v]);
      setValue(v);
    }
  }

  useEffect(() => {
    const search = filter;
    const searchLower = search?.toLowerCase();
    const filterData = finances?.filter(desc => {
      return desc.description.toLowerCase().includes(searchLower) || desc.category.toLowerCase().includes(searchLower);
    })
    setFinancesFilter(filterData);
  }, [filter])

  useEffect(() => {
  console.log('params1',routeParams);
    api.get(`/finances/${dataFormat}`, {
      headers: {
        "x-access-token": routeParams.token
      }}).then(response => {
      console.log(response)
      setFinances(response.data)
      setFinancesFilter(response.data)
    });
    api.get(`/values/${dataFormat}`, {
      headers: {
        "x-access-token": routeParams.token
      }}).then(response => {
      setBalance(response.data.saldo);
      setNumberPut(response.data.quantidadeLançamentos);
      setExpense(response.data.despesa);
      setRevenue(response.data.receita);
    });
  }, [dataFormat]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header stateButton={false} tokenParams={routeParams} createOrEdit={"create"}/>
      <ScrollView style={styles.container}>
        <View style={styles.containerMonthYear}>
          <TouchableOpacity onPress={() => count("-")}>
            <Icon name="leftcircle" size={32} color="#34cb79" />
          </TouchableOpacity>
          <Text style={styles.date}>{data}</Text>
          <TouchableOpacity onPress={() => count("+")}>
            <Icon name="rightcircle" size={32} color="#34cb79" />
          </TouchableOpacity>
        </View>
        <View style={styles.cards}>
          <Values titleValue="Lançamentos" values={numberPut}/>
          <Values titleValue="Despesas" values={expense}/>
        </View>
        <View style={styles.cards}>
          <Values titleValue="Receita" values={revenue}/>
          <Values titleValue="Saldo" values={balance}/>
        </View>
        <TextInput style={styles.filter} onChangeText={e => setFilter(e)} valeu={filter} placeholder="Pesquisar..." />
        <Text>{financesFilter?.day}</Text>
        <View style={styles.list}>
          {financesFilter?.map(item => {
            return (
              <Item key={item._id} dataFinances={item} tokenParams={routeParams} createOrEdit={"edit"}/>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerMonthYear: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  filter: {
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    height: 40
  },
  date: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    margin: 5,
    width: 66,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  list: {
    alignItems: 'stretch'
  },
});

export default TimeLine;