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
import api from "../services/api";
import {useRoute} from "@react-navigation/native";
import {AntDesign as Icon} from "@expo/vector-icons";
import { maskAmountBack } from "../utils/maskCPF";

const today = new Date;

const TimeLine = () => {
  const [balance, setBalance] = useState();
  const [numberPut, setNumberPut] = useState();
  const [expense, setExpense] = useState();
  const [revenue, setRevenue] = useState();

  const [finances, setFinances] = useState();
  const [financesFilter, setFinancesFilter] = useState();

  const [data, setData] = useState(`${today.getMonth()+1}/${today.getFullYear()}`);
  const [dataFormat, setDataFormat] = useState(`${today.getFullYear()}-${today.getMonth()+1}`);

  const [filter, setFilter] = useState();

  const route = useRoute();
  const routeParams = route.params;

  function monthYear(sinal) {
    let month = Number(data.split("/")[0]);
    let year = Number(data.split("/")[1]);
    if (sinal === "+") {
      if (month >= 12) {
        month = '01';
        year++;
      } else {
        if (month < 9) {
          month++;
          month = '0' + month;
        } else {
          month++;
        }
      }
    } else {
      if (month <= 1) {
        month = 12;
        year--;
      } else {
        if (month <= 10) {
          month--;
          month = '0' + month;
        } else {
          month--;
        }
      }
    }
    setData(`${month}/${year}`);
    setDataFormat(`${year}-${month}`);
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
          setFinances(response.data);
          setFinancesFilter(response.data);
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
          <TouchableOpacity onPress={() => monthYear("-")}>
            <Icon name="leftcircle" size={32} color="#34cb79" />
          </TouchableOpacity>
          <Text style={styles.date}>{data}</Text>
          <TouchableOpacity onPress={() => monthYear("+")}>
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
