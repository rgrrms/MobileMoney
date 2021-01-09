import React, {useEffect, useState} from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Values from "../components/Values";
import Item from "../components/Item";
import api from "../services/api";
import {useRoute} from "@react-navigation/native";
import {AntDesign as Icon} from "@expo/vector-icons";
import { maskAmountBack } from "../utils/maskCPF";
import EStyleSheet from 'react-native-extended-stylesheet';

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

  const [value, setValue] = useState('0')

  const [data, setData] = useState(Data[value]);
  const [dataFormat, setDataFormat] = useState(DataFormat[Number(value)]);

  const [filter, setFilter] = useState();

  const routeParams = route.params;

  function count(sinal) {
    let v = +value;
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
    try {
      api.get(`/finances/${dataFormat}`, {
        headers: {
          "x-access-token": routeParams.token
        }}).then(response => {
        setFinances(response.data)
        setFinancesFilter(response.data)
      });
      api.get(`/values/${dataFormat}`, {
        headers: {
          "x-access-token": routeParams.token
        }}).then(response => {
        setBalance(maskAmountBack(response.data.saldo));
        setNumberPut(response.data.quantidadeLançamentos);
        setExpense(maskAmountBack(response.data.despesa));
        setRevenue(maskAmountBack(response.data.receita));
      });
    } catch (e) {
      alert(e.response.data.message)
    }
  }, [dataFormat]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
  containerMonthYear: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0.3rem',
  },
  filter: {
    borderBottomWidth: 1,
    marginTop: '0.3rem',
    marginBottom: '0.3rem',
    height: '3rem',
  },
  date: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: '0.5rem',
    padding: '0.3rem',
    margin: '0.5rem',
    width: '4.2rem',
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
