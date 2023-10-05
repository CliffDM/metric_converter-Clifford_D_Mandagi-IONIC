import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonInput,
  IonLabel,
  IonRow,
  IonGrid,
  IonCol,
  IonAlert,
  IonCard,
  IonCardContent
} from '@ionic/react';
import './Home.css';
import React, {useState, useEffect} from 'react';

const Home: React.FC = () => {

  const [metric, setMetric] = useState<string>('');
  const [satuan1, setFromUnit] = useState<string>('');
  const [satuan2, setToUnit] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | string>('0');
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    setFromUnit('');
    setToUnit('');
    setInputValue('');
    setResult('0');
  }, [metric]);

  useEffect(() => {
    handleConversion();
  }, [inputValue, metric, satuan1, satuan2]);

  const handleConversion = () => {
    let nilaiKonversi: number | string = 0;

    if (metric === 'Panjang') {
      if (satuan1 === 'Meter' && satuan2 === 'Kilometer') {
        nilaiKonversi = parseFloat(inputValue) / 1000 + "km";
      } else if (satuan1 === 'Kilometer' && satuan2 === 'Meter') {
        nilaiKonversi = parseFloat(inputValue) * 1000 + "m";
      } else if (satuan1 === 'Centimeter' && satuan2 === 'Meter') {
        nilaiKonversi = parseFloat(inputValue) / 100 + "m";
      } else if (satuan1 === 'Meter' && satuan2 === 'Centimeter') {
        nilaiKonversi = parseFloat(inputValue) * 100 + "cm";
      }else if (satuan1 === 'Kilometer' && satuan2 === 'Centimeter') {
       nilaiKonversi = parseFloat(inputValue) * 100000 + "cm";
      } else if (satuan1 === 'Centimeter' && satuan2 === 'Kilometer') {
       nilaiKonversi = parseFloat(inputValue) / 100000 + "km";
      }
    } else if (metric === 'Berat') {
      if (satuan1 === 'Kilogram' && satuan2 === 'Gram') {
        nilaiKonversi = parseFloat(inputValue) * 1000 + "g";
      } else if (satuan1 === 'Gram' && satuan2 === 'Kilogram') {
        nilaiKonversi = parseFloat(inputValue) / 1000 + "kg";
      } else if (satuan1 === 'Miligram' && satuan2 === 'Gram') {
        nilaiKonversi = parseFloat(inputValue) / 1000 + "g";
      } else if (satuan1 === 'Gram' && satuan2 === 'Miligram') {
        nilaiKonversi = parseFloat(inputValue) * 1000 + 'mg';
      } else if (satuan1 === 'Kilogram' && satuan2 === 'Miligram') {
        nilaiKonversi = parseFloat(inputValue) * 1000000 + "mg";
      } else if (satuan1 === 'Miligram' && satuan2 === 'Kilogram') {
        nilaiKonversi = parseFloat(inputValue) / 1000000 + "kg";
      }
    } else if (metric === 'Suhu') {
      if (satuan1 === 'Celsius' && satuan2 === 'Fahrenheit') {
        nilaiKonversi = (parseFloat(inputValue) * 9/5) + 32 + "°F";
      } else if (satuan1 === 'Fahrenheit' && satuan2 === 'Celsius') {
        nilaiKonversi = (parseFloat(inputValue) - 32) * 5/9 + "°C";
      }else if (satuan1 === 'Celsius' && satuan2 === 'Kelvin') {
        nilaiKonversi = parseFloat(inputValue) + 273.15 + "K";
      } else if (satuan1 === 'Kelvin' && satuan2 === 'Celsius') {
        nilaiKonversi = parseFloat(inputValue) - 273.15 + "°C";
      } else if (satuan1 === 'Fahrenheit' && satuan2 === 'Kelvin') {
        nilaiKonversi = ((parseFloat(inputValue) - 32) * 5) / 9 + 273.15 + "K";
      } else if (satuan1 === 'Kelvin' && satuan2 === 'Fahrenheit') {
        nilaiKonversi = ((parseFloat(inputValue) - 273.15) * 9) / 5 + 32 + "°F";
      }
    } else {
      setResult('Salah Input');
      return;
    }
    setResult(nilaiKonversi);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Metric Converter</IonTitle>
          <IonTitle>By: Clifford D. Mandagi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonSelect
                      value={metric}
                      onIonChange={(e) => setMetric(e.detail.value)}
                      label='Pilih Metrik'
                    >
                      <IonSelectOption value="Panjang">Panjang</IonSelectOption>
                      <IonSelectOption value="Berat">Berat</IonSelectOption>
                      <IonSelectOption value="Suhu">Suhu</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
              {metric && (
                <>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">Dari:</IonLabel>
                        <IonSelect
                          value={satuan1}
                          onIonChange={(e) => setFromUnit(e.detail.value)}
                          label='Pilih Satuan'
                        >
                          {metric === 'Panjang' && (
                            <>
                              <IonSelectOption value="Meter">Meter</IonSelectOption>
                              <IonSelectOption value="Kilometer">Kilometer</IonSelectOption>
                              <IonSelectOption value="Centimeter">Centimeter</IonSelectOption>
                            </>
                          )}
                          {metric === 'Berat' && (
                            <>
                              <IonSelectOption value="Kilogram">Kilogram</IonSelectOption>
                              <IonSelectOption value="Gram">Gram</IonSelectOption>
                              <IonSelectOption value="Miligram">Miligram</IonSelectOption>
                            </>
                          )}
                          {metric === 'Suhu' && (
                            <>
                              <IonSelectOption value="Celsius">Celsius</IonSelectOption>
                              <IonSelectOption value="Fahrenheit">Fahrenheit</IonSelectOption>
                              <IonSelectOption value="Kelvin">Kelvin</IonSelectOption>
                            </>
                          )}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">Ke:</IonLabel>
                        <IonSelect
                          value={satuan2}
                          onIonChange={(e) => setToUnit(e.detail.value)}
                          label='Pilih Satuan'
                        >
                          {metric === 'Panjang' && (
                            <>
                              <IonSelectOption value="Meter">Meter</IonSelectOption>
                              <IonSelectOption value="Kilometer">Kilometer</IonSelectOption>
                              <IonSelectOption value="Centimeter">Centimeter</IonSelectOption>
                            </>
                          )}
                          {metric === 'Berat' && (
                            <>
                              <IonSelectOption value="Kilogram">Kilogram</IonSelectOption>
                              <IonSelectOption value="Gram">Gram</IonSelectOption>
                              <IonSelectOption value="Miligram">Miligram</IonSelectOption>
                            </>
                          )}
                          {metric === 'Suhu' && (
                            <>
                              <IonSelectOption value="Celsius">Celsius</IonSelectOption>
                              <IonSelectOption value="Fahrenheit">Fahrenheit</IonSelectOption>
                              <IonSelectOption value="Kelvin">Kelvin</IonSelectOption>
                            </>
                          )}
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonInput
                          type="number"
                          value={inputValue}
                          onIonChange={(e) => setInputValue(e.detail.value!)}
                          label='Nilai:'
                          placeholder='Isi Nilai Angka'
                        ></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  {/* <IonRow>
                    <IonCol>
                      <IonButton expand="full" onClick={handleConversion} color="primary">Konversi</IonButton>
                    </IonCol>
                  </IonRow> */}
                  <IonRow>
                    <IonCol>
                      <IonTitle class='ion-text-center' color="dark">Hasil Konversi</IonTitle>
                      <IonTitle class='ion-text-center' color="primary">{result}</IonTitle>
                    </IonCol>
                  </IonRow>
                </>
              )}
            </IonGrid>
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              header="Peringatan"
              message="Masukkan nilai yang valid (numerik)."
              buttons={['OK']}/>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
