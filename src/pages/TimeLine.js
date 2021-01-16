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
import {useNavigation, useRoute} from "@react-navigation/native";
import {AntDesign as Icon} from "@expo/vector-icons";
import { maskAmountBack } from "../utils/maskCPF";
import {AdMobBanner} from "expo-ads-admob";

const today = new Date;

const TimeLine = () => {
  const [balance, setBalance] = useState();
  const [numberPut, setNumberPut] = useState();
  const [expense, setExpense] = useState();
  const [revenue, setRevenue] = useState();

  const [finances, setFinances] = useState();
  const [financesFilter, setFinancesFilter] = useState();

  const route = useRoute();

  const navigation = useNavigation();

  const [value, setValue] = useState('0')

  const [filter, setFilter] = useState();

  const [updateNewList, setUpdateNewList] = useState(0);

  const [data, setData] = useState(`${today.getMonth()+1}/${today.getFullYear()}`);
  const [dataFormat, setDataFormat] = useState(`${today.getFullYear()}-${today.getMonth()+1}`);
  
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

  function reloadDeleted() {
    setUpdateNewList(updateNewList + 1);
  }

  useEffect(() => {
    navigation.addListener('focus', ()=> {
      console.log(routeParams)
      routeParams.updateList == true ? setUpdateNewList(updateNewList + 1) : false;
    })
  }, []);

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
  }, [dataFormat, updateNewList]);

  const bannerError = (e) => {
    alert(e)
  }

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
              <Item key={item._id} dataFinances={item} tokenParams={routeParams} functionReloadDeleted={reloadDeleted} createOrEdit={"edit"}/>
            )
          })}
        </View>
      </ScrollView>
      <AdMobBanner
        bannerSize="smartBanner"
        adUnitID="ca-app-pub-6552849276772222/8210045785"
        onDidFailToReceiveAdWithError={(e) => bannerError(e)} />
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
