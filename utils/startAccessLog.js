import axios from 'axios';

export const checkInAccessLog = async (accessLogId, closeModal) => {
  try {
    const response = await axios.put(`/api/update/updateAccessLog/${accessLogId}`, {
      statusAccessLog: 'ativo',
      checkIn: Date.now(),
    });

    if (response.status === 200) {
      console.log('Status do AccessLog atualizado com sucesso!');
      closeModal(false);
    } else {
      console.error('Falha ao atualizar o status do AccessLog.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};

export const checkOutAccessLog = async (accessLogId, closeModal) => {
  try {
    const response = await axios.put(`/api/update/updateAccessLog/${accessLogId}`, {
      statusAccessLog: 'finalizado',
      checkOut: Date.now(),
    });

    if (response.status === 200) {
      console.log('Status do AccessLog atualizado com sucesso!');
      closeModal(false);
    } else {
      console.error('Falha ao atualizar o status do AccessLog.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};

